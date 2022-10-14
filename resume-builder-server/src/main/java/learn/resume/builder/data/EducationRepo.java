package learn.resume.builder.data;

import learn.resume.builder.models.Education;
import learn.resume.builder.models.WorkHistory;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface EducationRepo {
    List<Education> findAll();
    List<Education> getEducationByResumeId(int resumeId);
    Education add(Education education);
    @Transactional
    boolean deleteById(int educationId);
}
