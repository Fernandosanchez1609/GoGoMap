package com.esplai.backendgogomap.models.dtos.geojson;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RawFeatureDTO {

    private RawGeometryDTO geometry;
    private RawPropertiesDTO properties;
}