package learn.resume.builder.domain;

import learn.resume.builder.data.SkillRepo;
import learn.resume.builder.data.WorkHistoryRepository;
import learn.resume.builder.models.Skill;
import learn.resume.builder.models.WorkHistory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class SkillServiceTest {
    @MockBean
    SkillRepo repository;

    @Autowired
    SkillService service;
    @Test
    void shouldFindAllSkills() {
        List<Skill> skills = new ArrayList<>();
        skills.add(new Skill(1, "Skill One"));
        skills.add(new Skill(1, "Skill Two"));

        when(repository.findAll()).thenReturn(skills);
        List<Skill> result = service.findAll();
        assertEquals(2, skills.size());
    }
//    @Test
//    void shouldAddSkill(){
//        Skill skill = new Skill();
//        skill.setSkillId(1);
//        skill.setSkillName("Name");
//
//        Result<Skill> result = service.add(skill);
//
//        assertTrue(result.isSuccess());
//    }
}