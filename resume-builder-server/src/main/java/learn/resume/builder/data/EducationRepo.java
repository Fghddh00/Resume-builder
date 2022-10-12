package learn.resume.builder.data;

import learn.resume.builder.models.Education;

import java.util.List;

public interface EducationRepo {
    List<Education> findAll();

    Education findById(int educationId);
}
