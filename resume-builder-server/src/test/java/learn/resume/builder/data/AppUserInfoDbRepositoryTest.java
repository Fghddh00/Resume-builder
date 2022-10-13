package learn.resume.builder.data;

import learn.resume.builder.models.AppUserInfo;
import learn.resume.builder.models.Resume;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AppUserInfoDbRepositoryTest {


    @Autowired
    AppUserInfoDbRepository infoRepo;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldNotFindUserInfoByNonExistingResumeId(){
        AppUserInfo actual = infoRepo.findUserByResumeId(100);
        assertNull(actual);
    }

    @Test
    void shouldFindEmailByResumeId() {
        AppUserInfo actual = infoRepo.findUserByResumeId(1);

        assertNotNull(actual);
        assertEquals("jason@gmail.com", actual.getEmail());
    }

    @Test
    void shouldFindFirstNameByResumeId() {
        AppUserInfo actual = infoRepo.findUserByResumeId(1);

        assertNotNull(actual);
        assertEquals("jason", actual.getFirstName());
    }

    @Test
    void shouldFindLastNameByResumeId() {
        AppUserInfo actual = infoRepo.findUserByResumeId(1);

        assertNotNull(actual);
        assertEquals("oh", actual.getLastName());
    }

    @Test
    void shouldFindAddressByResumeId() {
        AppUserInfo actual = infoRepo.findUserByResumeId(1);

        assertNotNull(actual);
        assertEquals("testaddress", actual.getAddress());
    }

    @Test
    void shouldFindPhoneNumberByResumeId() {
        AppUserInfo actual = infoRepo.findUserByResumeId(1);

        assertNotNull(actual);
        assertEquals("123456789", actual.getPhoneNumber());
    }

    @Test
    void shouldAddUserInfo(){
        AppUserInfo appUserInfo = new AppUserInfo();
        appUserInfo.setEmail("email");
        appUserInfo.setFirstName("fname");
        appUserInfo.setLastName("lname");
        appUserInfo.setAddress("address");
        appUserInfo.setPhoneNumber("pn");

        AppUserInfo actual = infoRepo.add(appUserInfo);
        assertEquals(actual.getEmail(), appUserInfo.getEmail());
        assertEquals(actual.getFirstName(), appUserInfo.getFirstName());
        assertEquals(actual.getLastName(), appUserInfo.getLastName());
        assertEquals(actual.getAddress(), appUserInfo.getAddress());
        assertEquals(actual.getPhoneNumber(), appUserInfo.getPhoneNumber());
    }

}