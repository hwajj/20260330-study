package com.study.si.order;

import com.study.si.order.OrderDtos.OrderRequest;
import com.study.si.order.OrderDtos.OrderResponse;
import com.study.si.security.AuthUser;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

	private final OrderService orderService;

	public OrderController(OrderService orderService) {
		this.orderService = orderService;
	}

	@GetMapping
	public List<OrderResponse> list(@AuthenticationPrincipal AuthUser user) {
		return orderService.list(user.id());
	}

	@GetMapping("/{id}")
	public OrderResponse get(@AuthenticationPrincipal AuthUser user, @PathVariable Long id) {
		return orderService.get(user.id(), id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public OrderResponse create(@AuthenticationPrincipal AuthUser user, @Valid @RequestBody OrderRequest req) {
		return orderService.create(user.id(), req);
	}

	@PutMapping("/{id}")
	public OrderResponse update(
			@AuthenticationPrincipal AuthUser user,
			@PathVariable Long id,
			@Valid @RequestBody OrderRequest req) {
		return orderService.update(user.id(), id, req);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@AuthenticationPrincipal AuthUser user, @PathVariable Long id) {
		orderService.delete(user.id(), id);
	}
}
