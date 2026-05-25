package com.esplai.backendgogomap.models.enums;

import lombok.Getter;

@Getter
public enum Ods {
    FIN_DE_POBREZA(1, "Fin de la pobreza"),
    HAMBRE_CERO(2, "Hambre cero"),
    SALUD_Y_BIENESTAR(3, "Salud y bienestar"),
    EDUCACION_CALIDAD(4, "Educación de calidad"),
    IGUALDAD_GENERO(5, "Igualdad de género"),
    AGUA_LIMPIA(6, "Agua limpia y saneamiento"),
    ENERGIA_ASEQUIBLE(7, "Energía asequible y no contaminante"),
    TRABAJO_DECENTE(8, "Trabajo decente y crecimiento económico"),
    INDUSTRIA_INNOVACION(9, "Industria, innovación e infraestructura"),
    REDUCCION_DESIGUALDADES(10, "Reducción de las desigualdades"),
    CIUDADES_SOSTENIBLES(11, "Ciudades y comunidades sostenibles"),
    PRODUCCION_CONSUMO(12, "Producción y consumo responsables"),
    ACCION_CLIMA(13, "Acción por el clima"),
    VIDA_SUBMARINA(14, "Vida submarina"),
    VIDA_ECOSISTEMAS(15, "Vida de ecosistemas terrestres"),
    PAZ_JUSTICIA(16, "Paz, justicia e instituciones sólidas"),
    ALIANZAS(17, "Alianzas para lograr los objetivos");

    private final int odsNumber;
    private final String odsName;

    Ods(int odsNumber, String odsName) {
        this.odsNumber = odsNumber;
        this.odsName = odsName;
    }

    // Método de ayuda para buscar un ODS por su número (útil para el DataLoader)
    public static Ods fromNumber(int odsNumber) {
        for (Ods ods : values()) {
            if (ods.getOdsNumber() == odsNumber) {
                return ods;
            }
        }
        throw new IllegalArgumentException("Número de ODS no válido: " + odsNumber);
    }
}