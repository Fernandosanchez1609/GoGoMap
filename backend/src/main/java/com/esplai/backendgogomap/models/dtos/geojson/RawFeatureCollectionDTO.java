package com.esplai.backendgogomap.models.dtos.geojson;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import java.util.List;


@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RawFeatureCollectionDTO {
    private List<RawFeatureDTO> features;
}