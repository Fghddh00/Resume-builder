package learn.resume.builder.models;

import org.springframework.security.core.userdetails.User;

import java.util.List;
import java.util.stream.Collectors;

public class AppUser extends User {
    private int userId;
    private String username;
    private String passHash;
    private String email;
    private String firstName;
    private String lastName;
    private String address;
    private String phoneNumber;
    private List<AppRole> userRoles;

    public AppUser(int userId, String username, String passHash, List<AppRole> roles) {
        super(username, passHash, roles.stream().map( r -> r.getAuthority()).collect(Collectors.toList()));

        this.userId = userId;
        this.username = username;
        this.passHash = passHash;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.userRoles = roles;
    }

    public int getUser_id() {
        return userId;
    }

    public void setUser_id(int user_id) {
        this.userId = userId;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassHash() {
        return passHash;
    }

    public void setPassHash(String passHash) {
        this.passHash = passHash;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<AppRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<AppRole> userRoles) {
        this.userRoles = userRoles;
    }
}
