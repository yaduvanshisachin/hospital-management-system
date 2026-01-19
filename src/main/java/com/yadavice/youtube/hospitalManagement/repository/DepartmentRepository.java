package com.yadavice.youtube.hospitalManagement.repository;

import com.yadavice.youtube.hospitalManagement.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}