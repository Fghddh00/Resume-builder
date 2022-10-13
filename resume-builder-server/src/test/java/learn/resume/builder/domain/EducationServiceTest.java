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
    void shouldFindAllSkills() {
        List<Education> educations = new ArrayList<>();
        educations.add(new Education(1, "Education", "Education_level"));
        educations.add(new Education(1, "EducationTwo", "Education_level_two"));

        when(repository.findAll()).thenReturn(educations);
        List<Education> result = service.findAll();
        assertEquals(2, educations.size());
    }

}