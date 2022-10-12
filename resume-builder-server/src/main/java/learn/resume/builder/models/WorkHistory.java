package learn.resume.builder.models;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

public class WorkHistory {

    private int workHistoryId;
    private String jobTitle;
    private LocalDate startDate;
    private LocalDate endDate;
    private String jobDescription;
    List<Resume> resumes;


    public WorkHistory(int workHistoryId, String jobTitle, LocalDate startDate, LocalDate endDate, String jobDescription) {
        this.workHistoryId = workHistoryId;
        this.jobTitle = jobTitle;
        this.startDate = startDate;
        this.endDate = endDate;
        this.jobDescription = jobDescription;
    }

    public WorkHistory(){

    }

    public List<Resume> getResumes() {
        return resumes;
    }

    public void setResumes(List<Resume> resumes) {
        this.resumes = resumes;
    }

    public int getWorkHistoryId() {
        return workHistoryId;
    }

    public void setWorkHistoryId(int workHistoryId) {
        this.workHistoryId = workHistoryId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof WorkHistory)) return false;
        WorkHistory that = (WorkHistory) o;
        return workHistoryId == that.workHistoryId && Objects.equals(jobTitle, that.jobTitle) && Objects.equals(startDate, that.startDate) && Objects.equals(endDate, that.endDate) && Objects.equals(jobDescription, that.jobDescription) && Objects.equals(resumes, that.resumes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(workHistoryId, jobTitle, startDate, endDate, jobDescription, resumes);
    }
}
