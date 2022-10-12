package learn.resume.builder.domain;

import learn.resume.builder.data.SkillRepo;
import learn.resume.builder.models.Education;
import learn.resume.builder.models.Skill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    @Autowired
    private final SkillRepo repository;

    public SkillService(SkillRepo repository) {
        this.repository = repository;
    }
    public List<Skill> findAll() {
        return repository.findAll();
    }

}
