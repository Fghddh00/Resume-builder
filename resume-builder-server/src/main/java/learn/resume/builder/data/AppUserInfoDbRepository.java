package learn.resume.builder.data;

import learn.resume.builder.App;
import learn.resume.builder.data.mapper.AppUserInfoMapper;
import learn.resume.builder.data.mapper.EducationMapper;
import learn.resume.builder.models.AppUserInfo;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class AppUserInfoDbRepository implements AppUserInfoRepo {
    private final JdbcTemplate jdbcTemplate;

    public AppUserInfoDbRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<AppUserInfo> findAll() {
        final String sql = "select info_id, email, first_name, last_name, address, phone_number\n" +
                "from app_user_info;";
        return jdbcTemplate.query(sql, new AppUserInfoMapper());
    }

    @Override
    public AppUserInfo findUserByResumeId(int resumeId) {
        final String sql = "    select app_user_info.* from resume_app\n" +
                "    inner join app_user_info\n" +
                "    on resume_app.info_id = app_user_info.info_id\n" +
                "    where resume_app.resume_id = ?;\n";

        return jdbcTemplate.query(sql, new AppUserInfoMapper(), resumeId)
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    public AppUserInfo add(AppUserInfo appUserInfo) {
        final String sql = "insert into app_user_info (email, first_name, last_name, address, phone_number)"
        + " values (?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, appUserInfo.getEmail());
            ps.setString(2, appUserInfo.getFirstName());
            ps.setString(3, appUserInfo.getLastName());
            ps.setString(4, appUserInfo.getAddress());
            ps.setString(5, appUserInfo.getPhoneNumber());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }
        appUserInfo.setInfoId(keyHolder.getKey().intValue());
        return appUserInfo;
    }

    @Override
    @Transactional
    public boolean deleteById(int appUserInfoId, int resumeId) {

        jdbcTemplate.update("delete from resume_skill where resume_id = ?;", resumeId);
        jdbcTemplate.update("delete from resume_work_history where resume_id = ?;", resumeId);
        jdbcTemplate.update("delete from resume_education where resume_id = ?;", resumeId);
        jdbcTemplate.update("delete from resume_app where info_id = ?;", appUserInfoId);
        return jdbcTemplate.update("delete from resume_app where info_id = ?;", appUserInfoId) > 0;
    }

}
