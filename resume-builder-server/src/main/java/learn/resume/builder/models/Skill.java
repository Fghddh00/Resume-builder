package learn.resume.builder.models;

import java.util.List;

public class Skill {
    private int skillId;
    private String skillName;
    List<Resume> resumes;


    public Skill(int skillId, String skillName) {
        this.skillId = skillId;
        this.skillName = skillName;
    }
    public Skill(){

    }

    public int getSkillId() {
        return skillId;
    }

    public void setSkillId(int skillId) {
        this.skillId = skillId;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public List<Resume> getResumes() {
        return resumes;
    }

    public void setResumes(List<Resume> resumes) {
        this.resumes = resumes;
    }
}
