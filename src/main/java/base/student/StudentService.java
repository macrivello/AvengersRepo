package base.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        List<Student> students = new ArrayList<>();
        studentRepository.findAll().forEach(students::add);
        return students;
    }

    public Student getStudent(Long id) {
        return studentRepository.findOne(id);
    }

    public void addStudent(Student student) {
        studentRepository.save(student);
    }

    public void updateStudent(Long id, Student student) {
        Student temp = studentRepository.findOne(id);
        if (student == null) {
            return;
        } else {
            temp.setNumber(student.getNumber());
            temp.setFname(student.getFname());
            temp.setLname(student.getLname());
            studentRepository.save(temp);
        }
    }

    public void deleteStudent(Long id) {
        studentRepository.delete(id);
    }
}
