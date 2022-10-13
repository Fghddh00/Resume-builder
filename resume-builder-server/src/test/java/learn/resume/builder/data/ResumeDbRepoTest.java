package learn.resume.builder.data;

import learn.resume.builder.models.AppUserInfo;
import learn.resume.builder.models.Resume;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ResumeDbRepoTest {

    @Autowired
    ResumeDbRepo resumeRepo;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldNotGetTemplateIdByNonExistingResumeId() {
        Resume actual = resumeRepo.getById(100);

        assertNull(actual);
    }

    @Test
    void shouldGetTemplateIdByResumeId() {
        Resume actual = resumeRepo.getById(1);

        assertNotNull(actual);
        assertEquals(1, actual.getTemplateId());
    }

    @Test
    void shouldAddResume(){

        AppUserInfo userInfo = new AppUserInfo();
        userInfo.setInfoId(2);
        userInfo.setEmail("test email");
        userInfo.setFirstName("testFirst");
        userInfo.setLastName("testLast");
        userInfo.setAddress("testaddress");
        userInfo.setPhoneNumber("123456");

        Resume resumeToTest = new Resume();
        resumeToTest.setTemplateId(2);
        resumeToTest.setUserInfo(userInfo);

        Resume actual = resumeRepo.add(resumeToTest);

        assertNotNull(actual);
        assertEquals(3, actual.getResumeId());
    }

}