package learn.resume.builder.data;

import learn.resume.builder.models.Skill;
import learn.resume.builder.models.WorkHistory;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SkillRepo {

    List<Skill> findAll();
    List<Skill> getSkillByResumeId(int resumeId);
    Skill add(Skill skill);
    @Transactional
    boolean deleteById(int skillId);

    boolean update(Skill skill);
}
