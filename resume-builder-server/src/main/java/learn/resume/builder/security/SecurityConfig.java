package learn.resume.builder.security;

import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityConfig {
    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }
}
