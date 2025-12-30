{ pkgs, ... }: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
    pkgs.php83
    pkgs.php83Packages.composer
  ];
  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = ["php" "artisan" "serve" "--port" "$PORT" "--host" "0.0.0.0"];
        manager = "web";
      };
    };
  };
}