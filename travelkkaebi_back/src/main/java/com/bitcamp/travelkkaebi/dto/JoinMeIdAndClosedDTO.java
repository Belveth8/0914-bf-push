package com.bitcamp.travelkkaebi.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class JoinMeIdAndClosedDTO {
    private int joinMeId;
    private boolean closed;
}
