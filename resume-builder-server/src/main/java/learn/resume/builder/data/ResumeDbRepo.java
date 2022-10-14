package learn.resume.builder.data;


import learn.resume.builder.data.mapper.ResumeMapper;
import learn.resume.builder.models.Resume;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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
    public Resume getByResumeId(int resumeId) {
        return jdbcTemplate.query("select * from resume_app inner join app_user_info on app_user_info.info_id = resume_app.info_id where resume_id = ?;", new ResumeMapper(), resumeId)
                .stream().findFirst().orElse(null);
    }

    @Override
    public List<Resume> getResumesByUser(int userId) {

        String sql = "select * from resume_app inner join app_user on app_user.user_id = resume_app.user_id inner join app_user_info on app_user_info.info_id = resume_app.info_id where app_user.user_id = ?;";
        List<Resume> resumeList = jdbcTemplate.query(sql, new ResumeMapper(), userId);
        if (resumeList.size() < 1){
            return null;
        }
        return resumeList;
    }

    @Override
    public Resume add(Resume resumeToAdd) {

        if(resumeToAdd.getTemplateId()<1){
            return null;
        }
        if(resumeToAdd.getUserInfo() == null || resumeToAdd.getUser() == null){
            return null;
        }

        final String sql = "insert into resume_app (template_id, info_id, user_id) values (?,?, ?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, resumeToAdd.getTemplateId());
            ps.setInt(2, resumeToAdd.getUserInfo().getInfoId());
            ps.setInt(3,resumeToAdd.getUser().getUserId());
            return ps;
        }, keyHolder);
        if (rowsAffected <= 0){
            return null;
        }
        resumeToAdd.setResumeId(keyHolder.getKey().intValue());
        return resumeToAdd;
    }

    @Override
    @Transactional
    public boolean deleteByResumeId(int resumeId) {
        jdbcTemplate.update("delete from resume_skill where resume_id = ?;", resumeId);
        jdbcTemplate.update("delete from resume_work_history where resume_id = ?;", resumeId);
        jdbcTemplate.update("delete from resume_education where resume_id = ?;", resumeId);
        return jdbcTemplate.update("delete from resume_app where resume_id = ?;", resumeId) > 0;
    }

    @Override
    public boolean update(Resume resume) {
        return jdbcTemplate.update("updated resume_app set template_id = ? where resume_id = ?", resume.getTemplateId(), resume.getResumeId()) > 0;
    }


}
