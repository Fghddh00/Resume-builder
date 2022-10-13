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
}
