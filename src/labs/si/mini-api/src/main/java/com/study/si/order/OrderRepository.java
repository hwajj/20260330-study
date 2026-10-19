package com.study.si.order;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
	List<Order> findByUserIdOrderByIdDesc(Long userId);
}
