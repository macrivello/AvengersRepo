package base.security;

public enum RoleType {
    ADMIN, STUDENT, CATALOG_ADMIN;

    public String getRole() {
        return "ROLE_" + this.name();
    }
}
