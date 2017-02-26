package base;

import base.data.CourseRepository;
import base.data.PostRepository;
import base.model.Course;
import base.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final CourseRepository courseRepository;
    private final PostRepository postRepository;

    @Autowired
    public DatabaseLoader(CourseRepository courseRepository, PostRepository postRepository) {
        this.courseRepository = courseRepository;
        this.postRepository = postRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        ArrayList<Course> sampleCourseList = new ArrayList<>();
        sampleCourseList.add(new Course("CPE", "101", "Fundamentals of Computer Science I"));
        sampleCourseList.add(new Course("CPE", "102", "Fundamentals of Computer Science II"));
        sampleCourseList.add(new Course("CPE", "103", "Fundamentals of Computer Science III"));

        this.courseRepository.save(sampleCourseList);
//
//        ArrayList<Post> samplePosts = new ArrayList<>();
//        samplePosts.add(new Post("Hello" , "Hello Guys"));
//        samplePosts.add(new Post("Beer" , "Lets get some beer"));
//        samplePosts.add(new Post("IPA", "Double IPAs are the best"));
//
//        this.postRepository.save(samplePosts);
    }
}
