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



    public Resume findByResumeId(int resumeId) {
        Resume toHydrate = resumeRepo.getByResumeId(resumeId);

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


        return toHydrate;
    }

    public Result<List<Resume>> getResumesByUser(int userId) {
        Result getResult = new Result();

        List<Resume> userResumes = resumeRepo.getResumesByUser( userId );

        if (userResumes == null){
            getResult.addMessage("Resume List not Found", ResultType.NOT_FOUND);
            return getResult;
        }


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

    //TODO: Update as Result
    public boolean deleteByResumeId(int resumeId) {
        return resumeRepo.deleteByResumeId(resumeId);
    }

    public Result updateResume(Resume resume) {

        Result result = validate(resume);

        if (!result.isSuccess()){
            return result;
        }

        if(!resumeRepo.update(resume)){
            result.addMessage("Resume could not be updated", ResultType.INVALID);
        }

        return result;
    }

    private Result<Resume> validate(Resume resume) {
        Result<Resume> result = new Result<>();

        if (resume == null){
            result.addMessage("Resume is null", ResultType.INVALID);
            return result;
        }

        if (resume.getUser() == null){
            result.addMessage("Resume has no User", ResultType.INVALID);
            return result;
        }

        if (resume.getUserInfo() == null){
            result.addMessage("Resume has no User Info", ResultType.INVALID);
            return result;
        }

        if (resume.getResumeId() != 0){
            result.addMessage("resultId cannot be set for add operation", ResultType.INVALID);
        }

        if (resume.getTemplateId() < 1){
            result.addMessage("Resume Template is required", ResultType.INVALID);
        }

        return result;
    }

}
