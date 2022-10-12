package learn.resume.builder.data;


import learn.resume.builder.models.Resume;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ResumeDbRepo implements ResumeRepo{

    private final JdbcTemplate jdbcTemplate;

    public ResumeDbRepo(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Resume> findAll() {
//        final String sql = "select"
        return null;
    }
}
