package learn.resume.builder.data;

import learn.resume.builder.models.Skill;

import java.util.List;

public interface SkillRepo {

    List<Skill> findAll();

    Skill findById(int skillId);
}
