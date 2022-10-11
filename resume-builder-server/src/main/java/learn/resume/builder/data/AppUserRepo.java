package learn.resume.builder.data;

import learn.resume.builder.data.mapper.AppUserMapper;
import learn.resume.builder.domain.Result;
import learn.resume.builder.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class AppUserRepo {
    private final JdbcTemplate jdbcTemplate;

    public AppUserRepo(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public AppUser findByUsername(String username) {
        List<String> roles = getRolesByUsername(username);
        final String sql = "select user_id, username, password_hash, disabled"
                + " from app_user"
                + " where username = ? ;";

        return jdbcTemplate.query(sql, new AppUserMapper(roles), username)
                .stream().findFirst().orElse(null);
    }

    @Transactional
    public AppUser create(AppUser user) {
        final String sql = "insert into app_user (username, email, password_hash, first_name, last_name, address," +
                " phone_number, disabled) values" +
                " (?, ?, ?, ?, ?, ?, ?, ?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getPassword());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }
        user.setUserId(keyHolder.getKey().intValue());
        updateRoles(user);

        return user;
    }

    @Transactional
    public void update(AppUser user) {
        throw new UnsupportedOperationException();
    }
    private void updateRoles(AppUser user) {
        throw new UnsupportedOperationException();
    }

    private List<String> getRolesByUsername(String username) {
        throw new UnsupportedOperationException();
    }
}
