package learn.resume.builder.domain;


import learn.resume.builder.data.ResumeRepo;
import learn.resume.builder.models.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
class ResumeServiceTest {

    @MockBean
    ResumeRepo resumeRepo;

    @Autowired
    ResumeService service;

    @Test
    void shouldFindExpectedResumeByResumeId() {
        Resume expected = makeResume();

        when(resumeRepo.getById(1)).thenReturn(expected);

        Resume actual = service.findById(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotFindResumeCuzOfNonExistingResume(){
        Resume expected = makeResume();

        when(resumeRepo.getById(1)).thenReturn(expected);
        Resume actual = service.findById(100);
        assertNull(actual);
    }

    @Test
    void shouldFindListOfResumeByUserId(){
        List<Resume> resumes = new ArrayList<>();


    }

    @Test
    void shouldAddResume(){
        Resume resume = new Resume();
        resume.setTemplateId(2);
        resume.setUserInfo(makeResume().getUserInfo());

        Resume mockOut = makeResume();
        resume.setTemplateId(1);
        resume.setUserInfo(makeResume().getUserInfo());

        when(resumeRepo.add(resume)).thenReturn(mockOut);

        Result<Resume> actual = service.addResume(resume);
        assertEquals(mockOut, actual.getPayload());

    }

    Resume makeResume(){

        AppUserInfo userInfo = new AppUserInfo();
        userInfo.setInfoId(1);
        userInfo.setEmail("jason@gmail.com");
        userInfo.setFirstName("jason");
        userInfo.setLastName("oh");
        userInfo.setAddress("testaddress");
        userInfo.setPhoneNumber("123456789");

        List<Skill> skills = new ArrayList<>();
        skills.add(new Skill(1, "sing"));

        List<Education> educations = new ArrayList<>();
        educations.add(new Education(1,"College","Bachelors"));

        List<WorkHistory> workHistories = new ArrayList<>();
        workHistories.add(new WorkHistory(1, "Singer", LocalDate.of(2010,6,16), LocalDate.of(2010,10,16), "I sing and won American Idol"));

        List<AppRole> roles = new ArrayList<>();
        roles.add(new AppRole(1, "Job Seeker"));
        roles.add(new AppRole(2, "Employer"));

//        AppUser user = new AppUser(1,"jasonniv", "$2y$10$Gk9DNFuQNRhSYSDZ.xk3CO65dJ6wz3snAd2rdrVUTWcfUzrxHr5hq", false, roles);

        Resume resume = new Resume();
        resume.setResumeId(1);
        resume.setTemplateId(1);
//        resume.setUser(user);
        resume.setUserInfo(userInfo);
        resume.setSkills(skills);
        resume.setEducations(educations);
        resume.setWorkHistories(workHistories);

        return resume;
    }
}