package learn.resume.builder.data;


import learn.resume.builder.data.mapper.ResumeMapper;
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
//        final String sql =
//
//        return jdbcTemplate.query(sql, new ResumeMapper());
        return null;
    }

    @Override
    public Resume getById(int resumeId) {
        return jdbcTemplate.query("select * from resume_app where resume_id = ?;", new ResumeMapper(), resumeId)
                .stream().findFirst().orElse(null);
    }
}
