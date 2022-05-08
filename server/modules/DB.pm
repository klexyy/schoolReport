package DB;
use strict;
use warnings;
use Exporter;
use DBI;

our @ISA = qw( Exporter );

# these are exported by default.
our @EXPORT = qw( db_connect );

sub db_connect {
    my $driver   = "Pg";
<<<<<<< HEAD:server/modules/db.pm
    my $database = "tv";
=======
    my $database = "postgres";
>>>>>>> c8443fb5bbc8f8b1e35d810896293652ef47d89b:server/modules/DB.pm
    my $dsn    = "DBI:$driver:dbname = $database;host = 127.0.0.1;port = 5432";
    my $userid = "postgres";
    my $password = "postgres";
    my $dbh      = DBI->connect( $dsn, $userid, $password, { RaiseError => 1 } )
      or die $DBI::errstr;

    return ($dbh);
};

1;
