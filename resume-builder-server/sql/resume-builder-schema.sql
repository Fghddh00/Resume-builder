drop database if exists resume_builder;
create database resume_builder;
use resume_builder;


create table app_role (
    role_id 		int primary key auto_increment,
    role_name 		varchar(50) not null unique
);

create table app_user (
    user_id 		int primary key auto_increment,
    username		varchar(50) not null unique,
    password_hash 	varchar(2048) not null,
    disabled 		bit not null default(0)
);

create table app_user_info (
	info_id			int primary key auto_increment,
    email 			varchar(50) not null,
    first_name 		varchar(100) not null,
    last_name 		varchar(100) not null,
    address 		varchar(200) null,
    phone_number 	varchar(11) not null
);


create table app_user_role (
    user_id int not null,
    role_id int not null,
    constraint pk_app_user_role
        primary key (user_id, role_id),
    constraint fk_app_user_role_user_id
        foreign key (user_id)
        references app_user(user_id),
    constraint fk_app_user_role_role_id
        foreign key (role_id)
        references app_role(role_id)
);

create table education (
    education_id 	int primary key auto_increment,
    school_name 	varchar(50) not null,
    education_level varchar(50) not null
);

create table work_history (
    work_history_id 		int primary key auto_increment,
    work_history_company	varchar(150) not null,
    job_title 				varchar(50) not null,
    start_date 				date not null,
    end_date				date null,
    job_description			varchar(2000) not null
);

create table skill (
    skill_id 	int primary key auto_increment,
    skill_name 	varchar(100) not null
);


create table resume_app (
	resume_id 		int primary key auto_increment,
    resume_name		varchar(50) not null,
    template_id 	int not null,
	info_id 		int not null,
    user_id			int not null,
    constraint fk_resume_app_user_info
        foreign key (info_id)
        references app_user_info(info_id),
	constraint fk_resume_app_app_user
        foreign key (user_id)
        references app_user(user_id)
);

create table resume_education (
    resume_id 			int not null,
    education_id 		int not null,
    constraint fk_resume_education_resume_id
        foreign key (resume_id)
        references resume_app(resume_id),
    constraint fk_resume_education_education_id
        foreign key (education_id)
        references education(education_id),	
	constraint pk_resume_education
        primary key (education_id, resume_id)
);


create table resume_work_history (
	resume_id				int not null,
    work_history_id			int not null,
    constraint fk_resume_work_history_resume_id
        foreign key (resume_id)
        references resume_app(resume_id),
    constraint fk_resume_work_history_work_history_id
        foreign key (work_history_id)
        references work_history(work_history_id),
	constraint pk_resume_education
        primary key (work_history_id, resume_id)
);

create table resume_skill (
	resume_id	int not null,
    skill_id	int not null,
    constraint fk_resume_skill_resume_id
        foreign key (resume_id)
        references resume_app(resume_id),
    constraint fk_resume_skill_skill_id
        foreign key (skill_id)
        references skill(skill_id),
	constraint pk_resume_education
        primary key (resume_id,skill_id)
);

	delete from resume_skill;
    alter table resume_skill auto_increment = 1;
    delete from resume_work_history;
    alter table resume_work_history auto_increment = 1;
	delete from resume_education;
    alter table resume_education auto_increment = 1;
    delete from resume_work_history;
    alter table resume_work_history auto_increment = 1;
    delete from resume_app;
    alter table resume_app auto_increment = 1;
    delete from skill;
    alter table skill auto_increment = 1;
    delete from work_history;
    alter table work_history auto_increment = 1;
    delete from education;
    alter table education auto_increment = 1;
    delete from app_user_role;
    alter table app_user_role auto_increment = 1;
    delete from app_user_info;
    alter table app_user_info auto_increment = 1;
	delete from app_user;
    alter table app_user auto_increment = 1;
	delete from app_role;
    alter table app_role auto_increment = 1;
    
    insert into app_role values     
    (1, "Job Seeker"),
    (2, "Employer"),
    (3, "Admin");
    
    insert into app_user values (1, "jasonniv", "$2y$10$Gk9DNFuQNRhSYSDZ.xk3CO65dJ6wz3snAd2rdrVUTWcfUzrxHr5hq", 0);
    
    insert into app_user_info 
	values
	( 1, "jason@gmail.com", "jason", "oh", "testaddress", "123456789");
    
    insert into app_user_role values (1 , 1);
    
    insert into education values (1, "OHIO STATE UNIVERSITY", "Bachelor’s Degree in Computer Science");
    
    insert into work_history values 
    (1, "Laurel Barrie Financial", "Java Programmer", '2010-06-16', '2017-10-16', "Developed 10+ native Java applications per year with integrated BI tools. Beat deadlines for jobs by 15% on average.
	Led team of 2 Java programmers in project to improve product testing efficiency. Slashed time to test by 20%.
	Collaborated with 10 Java programmers to exceed KPIs by 10%.
	Onboarded and trained 12 Java programmers. Retrained 3 lagging new hires through regular coaching, raising their KPIs 50%."),
	(2, "BadCode Software", "Junior Java Programmer", '2017-11-16', '2021-12-16', "Assisted with development of 3 native Java applications.
	Collaborated to help slash security risk by 30% through automation.
	Worked with senior Java programmers to complete jobs 15% ahead of schedule with 98% client satisfaction scores.");
    
    insert into skill values 
    (1, "Java"),
    (2, "RESTful"),
    (3, " JSP"),
	(4, " Javascript"),
	(5, " HTML5");
    
    insert into resume_app 
    values
    (1, "professional resume", 5, 1, 1);
    
    
    insert into resume_education
    values
    (1,1);
    
	insert into resume_work_history
    values
    (1,1), (1,2);
    
    insert into resume_skill
    values
    (1,1),
    (1,2),
    (1,3),
    (1,4),
    (1,5);
    
    update resume_app set template_id=100, resume_name="kobe" where resume_id=1;
    
    select * from resume_app;