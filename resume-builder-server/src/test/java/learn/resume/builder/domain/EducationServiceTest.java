package learn.resume.builder.domain;

import learn.resume.builder.data.EducationRepo;
import learn.resume.builder.data.WorkHistoryRepository;
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
class EducationServiceTest {
    @MockBean
    EducationRepo repository;

    @Autowired
    EducationService service;

    @Test
    void shouldFindAllEducation() {
        List<Education> educations = new ArrayList<>();
        educations.add(new Education(1, "Education", "Education_level"));
        educations.add(new Education(1, "EducationTwo", "Education_level_two"));

        when(repository.findAll()).thenReturn(educations);
        List<Education> result = service.findAll();
        assertEquals(2, educations.size());
    }

    @Test
    void shouldAddEducation(){
        Education education = new Education();
        education.setSchoolName("name");
        education.setEducationLevel("level");

        Result<Education> result = service.add(education);
        assertTrue(result.isSuccess());
    }
    @Test
    void shouldNotAddEducationIfIdIsNotZero(){
        Education education = new Education();
        education.setEducationId(1);
        education.setSchoolName("name");
        education.setEducationLevel("level");

        Result<Education> result = service.add(education);
        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }
    @Test
    void shouldNotAddIfEducationIsNull(){
        Result<Education> result = service.add(null);
        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }
    @Test
    void shouldNotAddIfEducationNameIsNull(){
        Education education = new Education();
        education.setSchoolName(null);
        education.setEducationLevel("level");

        Result<Education> result = service.add(education);
        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }
    @Test
    void shouldNotAddIfEducationLevelIsNull(){
        Education education = new Education();
        education.setSchoolName("name");
        education.setEducationLevel(null);

        Result<Education> result = service.add(education);
        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }

}