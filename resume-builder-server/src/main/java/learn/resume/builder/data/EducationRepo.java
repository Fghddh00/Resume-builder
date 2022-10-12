package learn.resume.builder.data;

import learn.resume.builder.models.Education;
import learn.resume.builder.models.WorkHistory;

import java.util.List;

public interface EducationRepo {
    List<Education> findAll();
    List<Education> getEducationByResumeId(int resumeId);
    Education add(Education education);
}
