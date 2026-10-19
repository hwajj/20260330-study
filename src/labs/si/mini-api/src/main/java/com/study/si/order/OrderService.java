package com.study.si.order;

import com.study.si.order.OrderDtos.OrderRequest;
import com.study.si.order.OrderDtos.OrderResponse;
import com.study.si.user.User;
import com.study.si.user.UserRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class OrderService {

	private final OrderRepository orderRepository;
	private final UserRepository userRepository;

	public OrderService(OrderRepository orderRepository, UserRepository userRepository) {
		this.orderRepository = orderRepository;
		this.userRepository = userRepository;
	}

	@Transactional(readOnly = true)
	public List<OrderResponse> list(Long userId) {
		return orderRepository.findByUserIdOrderByIdDesc(userId).stream().map(OrderResponse::from).toList();
	}

	@Transactional
	public OrderResponse create(Long userId, OrderRequest req) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
		Order order = orderRepository.save(new Order(req.itemName(), req.quantity(), user));
		return OrderResponse.from(order);
	}

	@Transactional(readOnly = true)
	public OrderResponse get(Long userId, Long id) {
		return OrderResponse.from(owned(userId, id));
	}

	@Transactional
	public OrderResponse update(Long userId, Long id, OrderRequest req) {
		Order order = owned(userId, id);
		order.setItemName(req.itemName());
		order.setQuantity(req.quantity());
		return OrderResponse.from(order);
	}

	@Transactional
	public void delete(Long userId, Long id) {
		orderRepository.delete(owned(userId, id));
	}

	private Order owned(Long userId, Long id) {
		Order order = orderRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "order not found"));
		if (!order.getUser().getId().equals(userId)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "order not found");
		}
		return order;
	}
}
