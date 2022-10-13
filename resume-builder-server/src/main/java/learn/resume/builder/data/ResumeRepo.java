package learn.resume.builder.data;

import learn.resume.builder.models.Resume;

import java.util.List;

public interface ResumeRepo {
    List<Resume> findAll();

    Resume getById(int resumeId);

    Resume add(Resume resumeToAdd);

    List<Resume> getResumeByUserId(int userId);
}
