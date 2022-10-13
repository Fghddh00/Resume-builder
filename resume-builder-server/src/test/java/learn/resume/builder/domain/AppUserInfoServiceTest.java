package learn.resume.builder.domain;

import learn.resume.builder.data.AppUserInfoRepo;
import learn.resume.builder.data.EducationRepo;
import learn.resume.builder.models.AppUserInfo;
import learn.resume.builder.models.Education;
import learn.resume.builder.models.Skill;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class AppUserInfoServiceTest {
    @MockBean
    AppUserInfoRepo repository;

    @Autowired
    AppUserInfoService service;

    @Test
    void shouldFindAllAppUserInfo() {
        List<AppUserInfo> appUserInfo = new ArrayList<>();
        appUserInfo.add(new AppUserInfo(1, "email", "fname", "lname", "address",
                "pn"));
        appUserInfo.add(new AppUserInfo(2, "email2", "fname2", "lname2", "address2",
                "pn2"));

        when(repository.findAll()).thenReturn(appUserInfo);
        List<AppUserInfo> result = service.findAll();
        assertEquals(2, appUserInfo.size());
    }
    @Test
    void shouldAddAppUserInfo(){
        AppUserInfo appUserInfo = new AppUserInfo();
        appUserInfo.setEmail("email");
        appUserInfo.setFirstName("fname");
        appUserInfo.setLastName("lname");
        appUserInfo.setAddress("address");
        appUserInfo.setPhoneNumber("pn");

        Result<AppUserInfo> result = service.add(appUserInfo);
        assertTrue(result.isSuccess());
    }
    @Test
    void shouldNotAddAppUserInfoIfIdIsNotZero(){
        AppUserInfo appUserInfo = new AppUserInfo();
        appUserInfo.setInfoId(2);
        appUserInfo.setEmail("email");
        appUserInfo.setFirstName("fname");
        appUserInfo.setLastName("lname");
        appUserInfo.setAddress("address");
        appUserInfo.setPhoneNumber("pn");

        Result<AppUserInfo> result = service.add(appUserInfo);
        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }
    @Test
    void shouldNotAddNullAppUserInfo(){
        Result<AppUserInfo> result = service.add(null);
        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }
    @Test
    void shouldNotAddAppUserInfoIfEmailIsNull(){
        AppUserInfo appUserInfo = new AppUserInfo();
        appUserInfo.setEmail(null);
        appUserInfo.setFirstName("fname");
        appUserInfo.setLastName("lname");
        appUserInfo.setAddress("address");
        appUserInfo.setPhoneNumber("pn");

        Result<AppUserInfo> result = service.add(appUserInfo);
        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }
    @Test
    void shouldNotAddAppUserInfoIfFirstNameIsNull(){
        AppUserInfo appUserInfo = new AppUserInfo();
        appUserInfo.setEmail("email");
        appUserInfo.setFirstName(null);
        appUserInfo.setLastName("lname");
        appUserInfo.setAddress("address");
        appUserInfo.setPhoneNumber("pn");

        Result<AppUserInfo> result = service.add(appUserInfo);
        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }
    @Test
    void shouldNotAddAppUserInfoIfLastNameIsNull(){
        AppUserInfo appUserInfo = new AppUserInfo();
        appUserInfo.setEmail("email");
        appUserInfo.setFirstName("fname");
        appUserInfo.setLastName(null);
        appUserInfo.setAddress("address");
        appUserInfo.setPhoneNumber("pn");

        Result<AppUserInfo> result = service.add(appUserInfo);
        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }
    @Test
    void shouldNotAddAppUserInfoIfPhoneNumberIsNull(){
        AppUserInfo appUserInfo = new AppUserInfo();
        appUserInfo.setEmail("email");
        appUserInfo.setFirstName("fname");
        appUserInfo.setLastName("lname");
        appUserInfo.setAddress("address");
        appUserInfo.setPhoneNumber(null);

        Result<AppUserInfo> result = service.add(appUserInfo);
        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }
    @Test
    void shouldAddAppUserInfoIfAddressIsNull(){
        AppUserInfo appUserInfo = new AppUserInfo();
        appUserInfo.setEmail("email");
        appUserInfo.setFirstName("fname");
        appUserInfo.setLastName("lname");
        appUserInfo.setAddress(null);
        appUserInfo.setPhoneNumber("pn");

        Result<AppUserInfo> result = service.add(appUserInfo);
        assertTrue(result.isSuccess());
    }

}