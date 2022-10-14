package learn.resume.builder.domain;

import learn.resume.builder.data.SkillRepo;
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

    public Result<Skill> add (Skill skill){
        Result<Skill> result = validate(skill);
        if (!result.isSuccess()) {
            return result;
        }
        if (skill.getSkillId() != 0) {
            result.addMessage("Skill Id cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }
        skill = repository.add(skill);
        result.setPayload(skill);
        return result;
    }
    public Result deleteById(int skillId) {
        Result<Skill> result = new Result<>();
        if (!repository.deleteById(skillId)) {
            result.addMessage("Skill Id Id was not found", ResultType.NOT_FOUND);
        }
        if(result.isSuccess()){
            repository.deleteById(skillId);
        }
        return result;
    }

    public Result<Skill> update(Skill skill) {
        Result<Skill> result = validate(skill);

        if(!result.isSuccess()){
            return result;
        }
        if (skill.getSkillId() <= 0){
            result.addMessage("This Work History needs an Id", ResultType.INVALID);
        }
        if(!repository.update(skill)){
            result.addMessage("Work History could not be found", ResultType.NOT_FOUND);
        }

        return result;
    }


    private Result<Skill> validate(Skill skill) {
        Result<Skill> result = new Result<>();
        if (skill == null) {
            result.addMessage("skill cannot be null", ResultType.INVALID);
            return result;
        }
        if (skill.getSkillName() == null || skill.getSkillName().isBlank()){
            result.addMessage("skill name is required", ResultType.INVALID);
        }
        return result;
    }

}
