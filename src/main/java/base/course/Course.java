package base.course;

import base.department.Department;
import base.entry.Entry;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
public class Course implements Serializable {

		private Long id;
		private int number;
		private String title;
		private List<Entry> entries;
		private Department department;


	public Course() {
		
	}

	public Course(int number, String title, Department department) {
		this.number = number;
		this.title = title;
		this.department = department;
	}

	public Course(Course course) {
		this.id = course.id;
		this.number = course.number;
		this.title = course.title;
		this.entries = course.entries;
		this.department = course.department;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@OneToMany(targetEntity = Entry.class, mappedBy = "course",
			cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	public List<Entry> getEntries() {
		return entries;
	}

	public void setEntries(List<Entry> entries) {
		this.entries = entries;
	}

	@ManyToOne
	@JoinColumn(name = "department_id")
	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}
}


