package learn.resume.builder.data;

import learn.resume.builder.data.mapper.EducationMapper;
import learn.resume.builder.models.Education;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EducationDbRepository implements EducationRepo {
    private final JdbcTemplate jdbcTemplate;

    public EducationDbRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Education> findAll() {
        final String sql = "select education_id, school_name, education_level"
                + " from education;";
        return jdbcTemplate.query(sql, new EducationMapper());
    }

    @Override
    public Education add(Education education) {
        throw new UnsupportedOperationException();
    }

}
