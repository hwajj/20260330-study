package com.study.si.order;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public final class OrderDtos {

	private OrderDtos() {
	}

	public record OrderRequest(
			@NotBlank @Size(max = 120) String itemName,
			@Min(1) int quantity) {
	}

	public record OrderResponse(Long id, String itemName, int quantity) {
		static OrderResponse from(Order order) {
			return new OrderResponse(order.getId(), order.getItemName(), order.getQuantity());
		}
	}
}
