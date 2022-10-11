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
    email 			varchar(50) not null,
    password_hash 	varchar(2048) not null,
    first_name 		varchar(100) not null,
    last_name 		varchar(100) not null,
    address 		varchar(200) null,
    phone_number 	varchar(11) not null,
    disabled 		bit not null default(0)
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

insert into app_role (role_name) values
    ('JOBSEEKER');

create table education (
    education_id 	int primary key auto_increment,
    school_name 	varchar(50) not null,
    education_level varchar(50) not null
);

create table work_history (
    work_history_id 	int primary key auto_increment,
    job_title 			varchar(50) not null,
    start_date 			date not null,
    end_date			date null,
    job_description		varchar(2000) not null
);

create table skill (
    skill_id 	int primary key auto_increment,
    skill_name 	varchar(100) not null
);


create table resume_app (
	resume_id 		int primary key auto_increment,
    template_id 	int not null,
-- 	education_id	int not null,
--     work_history_id int not null,
--     skill_id		int not null,
    user_id			int not null,
	constraint fk_resume_user_id
		foreign key (user_id)
		references app_user(user_id)
	-- constraint fk_resume_education_id
-- 		foreign key (education_id)
-- 		references education(education_id),
--     constraint fk_resume_work_id
-- 		foreign key (work_history_id)
-- 		references work_history(work_history_id),
--     constraint fk_resume_skill_id
-- 		foreign key (skill_id)
-- 		references skill(skill_id),
);

create table resume_education (
    education_id 		int not null,
    resume_id 			int not null,
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
        primary key (skill_id, resume_id)
);