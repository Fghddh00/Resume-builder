package learn.resume.builder.domain;

import learn.resume.builder.data.*;
import learn.resume.builder.models.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResumeService {

    private final WorkHistoryRepository workHistoryRepository;
    private final SkillRepo skillRepo;
    private final EducationRepo educationRepo;
    private final AppUserInfoRepo infoRepo;
    private final ResumeRepo resumeRepo;

    public ResumeService(WorkHistoryRepository workHistoryRepository, SkillRepo skillRepo, EducationRepo educationRepo, AppUserInfoRepo infoRepo, ResumeRepo resumeRepo) {
        this.workHistoryRepository = workHistoryRepository;
        this.skillRepo = skillRepo;
        this.educationRepo = educationRepo;
        this.infoRepo = infoRepo;
        this.resumeRepo = resumeRepo;
    }

    public List<Resume> findAll() {
        return resumeRepo.findAll();
    }


    public Resume findById(int resumeId) {
        Resume toHydrate = resumeRepo.getById(resumeId);

        if (toHydrate != null){
            List<Education> educationList = educationRepo.getEducationByResumeId(resumeId);
            toHydrate.setEducations(educationList);
        }

        if (toHydrate != null){
            List<Skill> skillList = skillRepo.getSkillByResumeId(resumeId);
            toHydrate.setSkills(skillList);
        }

        if (toHydrate != null) {
            List<WorkHistory> workHistoryList = workHistoryRepository.getWorkHistoryByResumeId(resumeId);
            toHydrate.setWorkHistories(workHistoryList);
        }

        if (toHydrate != null){
            toHydrate.setUserInfo(infoRepo.findUserByResumeId(resumeId));
        }


        return toHydrate;
    }

    public Result<List<Resume>> getResumesByUser(int userId) {
        Result getResult = new Result();

        List<Resume> userResumes = resumeRepo.getResumesByUser( userId );

        getResult.setPayload(userResumes );

        return getResult;
    }

    public Result<Resume> addResume(Resume resumeToAdd) {
        Result<Resume> result = validate(resumeToAdd);

        if (!result.isSuccess()){
            return result;
        }

        resumeToAdd = resumeRepo.add(resumeToAdd);
        result.setPayload(resumeToAdd);
        return result;
    }

    private Result<Resume> validate(Resume resumeToAdd) {
        Result<Resume> result = new Result<>();

        if (resumeToAdd == null){
            result.addMessage("Resume is null", ResultType.INVALID);
            return result;
        }

        if (resumeToAdd.getResumeId() != 0){
            result.addMessage("resultId cannot be set for add operation", ResultType.INVALID);
        }

        if (resumeToAdd.getTemplateId() < 1){
            result.addMessage("Resume Template is required", ResultType.INVALID);
        }
        return result;
    }

}
