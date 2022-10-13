package learn.resume.builder.data;


import learn.resume.builder.data.mapper.ResumeMapper;
import learn.resume.builder.models.Resume;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
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

    @Override
    public List<Resume> getResumeByUserId(int userId) {
        return jdbcTemplate.query("select *\n" +
                "from resume_app\n" +
                "inner join app_user on app_user.user_id = resume_app.user_id\n" +
                "where app_user.user_id = ?;", new ResumeMapper(), userId);
    }

    @Override
    public Resume add(Resume resumeToAdd) {
        final String sql = "insert into resume_app (template_id, info_id) values (?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, resumeToAdd.getTemplateId());
            ps.setInt(2, resumeToAdd.getUserInfo().getInfoId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0){
            return null;
        }

        resumeToAdd.setResumeId(keyHolder.getKey().intValue());
        return resumeToAdd;
    }

}
