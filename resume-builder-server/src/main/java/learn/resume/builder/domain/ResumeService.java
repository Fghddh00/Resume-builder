package learn.resume.builder.domain;

import learn.resume.builder.data.EducationRepo;
import learn.resume.builder.data.ResumeRepo;
import learn.resume.builder.data.SkillRepo;
import learn.resume.builder.data.WorkHistoryRepository;
import learn.resume.builder.models.Education;
import learn.resume.builder.models.Resume;
import learn.resume.builder.models.Skill;
import learn.resume.builder.models.WorkHistory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResumeService {

    private final WorkHistoryRepository workHistoryRepository;
    private final SkillRepo skillRepo;
    private final EducationRepo educationRepo;
    private final ResumeRepo resumeRepo;

    public ResumeService(WorkHistoryRepository workHistoryRepository, SkillRepo skillRepo, EducationRepo educationRepo, ResumeRepo resumeRepo) {
        this.workHistoryRepository = workHistoryRepository;
        this.skillRepo = skillRepo;
        this.educationRepo = educationRepo;
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

        return toHydrate;
    }
}
