import moment from "moment";
export default {
  methods: {
    $can(permissionName) {
      const Permission = this.$store.state.auth.permissions;
      if (typeof Permission !== "undefined") {
        return Permission.indexOf(permissionName) !== -1;
      }
    },
    $parseDate(e) {
      return moment(e).format("yyyy-MM-DD, h:mm:ss");
    },
    $status_wny_color(status) {
      switch (status) {
        case "y":
          return "green--text";
        case "n":
          return "red--text";
        case "w":
          return "gray--text";
      }
    },
    $status_wny(e) {
      switch (e) {
        case "y":
          return "Disetujui";
        case "n":
          return "TIdak Disetujui";
        case "w":
          return "Menunggu";
      }
    },
    $findArrayByObjectName(array, objname, value) {
      return array.find(obj => obj[objname] === value);
    }
  },
};
