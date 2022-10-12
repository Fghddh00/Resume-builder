package learn.resume.builder.data.mapper;

import learn.resume.builder.models.AppUser;
import learn.resume.builder.models.AppUserInfo;
import learn.resume.builder.models.Resume;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ResumeMapper implements RowMapper<Resume> {
    @Override
    public Resume mapRow(ResultSet rs, int rowNum) throws SQLException {
        Resume resume = new Resume();
        resume.setResumeId(rs.getInt("resume_id"));
        resume.setTemplateId(rs.getInt("template_id"));

        AppUserMapper appUserMapper = new AppUserMapper();

        AppUserInfoMapper appUserInfoMapper = new AppUserInfoMapper();
        resume.setUserInfo(appUserInfoMapper.mapRow(rs, rowNum));

        return resume;
    }
}
