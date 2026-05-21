package com.esplai.backendgogomap.models.dtos.geojson;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RawPropertiesDTO {

    @JsonProperty("NOMBRE")
    private String nombre;

    @JsonProperty("DESCRIPCION")
    private String descripcion;

    @JsonProperty("DIRECCION")
    private String direccion;
}