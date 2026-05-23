package com.esplai.backendgogomap.models.dtos.geojson;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RawPropertiesDTO {


    @JsonAlias({"NOMBRE", "nombre", "title"})
    private String nombre;

    @JsonAlias({"DESCRIPCION", "descripcion", "description"})
    private String descripcion;

    @JsonAlias({"DIRECCION", "direccion", "address"})
    private String direccion;
}