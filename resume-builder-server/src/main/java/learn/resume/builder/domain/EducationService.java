package learn.resume.builder.domain;

import learn.resume.builder.data.EducationRepo;
import learn.resume.builder.models.Education;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationService {
    @Autowired
    private final EducationRepo repository;
    public EducationService(EducationRepo repository) {
        this.repository = repository;
    }
    public List<Education> findAll() {
        return repository.findAll();
    }

    public Result<Education> add (Education education){
        Result<Education> result = validate(education);
        if (!result.isSuccess()) {
            return result;
        }
        if (education.getEducationId() != 0) {
            result.addMessage("educationId cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }
        education = repository.add(education);
        result.setPayload(education);
        return result;
    }
    private Result<Education> validate(Education education) {
        Result<Education> result = new Result<>();
        if (education == null) {
            result.addMessage("education cannot be null", ResultType.INVALID);
            return result;
        }
        if (education.getSchoolName() == null || education.getSchoolName().isBlank()){
            result.addMessage("school name is required", ResultType.INVALID);
        }
        if (education.getEducationLevel() == null || education.getEducationLevel().isBlank()){
            result.addMessage("education level is required", ResultType.INVALID);
        }
        return result;
    }

}
