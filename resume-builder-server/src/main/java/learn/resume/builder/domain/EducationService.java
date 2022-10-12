package learn.resume.builder.domain;

import learn.resume.builder.data.EducationRepo;
import learn.resume.builder.models.Education;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationService {
    private final EducationRepo repository;

    public EducationService(EducationRepo repository) {
        this.repository = repository;
    }
    public List<Education> findAll() {
        return repository.findAll();
    }
    
}
