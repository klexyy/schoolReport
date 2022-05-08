package Auth;
use lib "../modules";
use DB;
use strict;
use warnings;
use Exporter;

our @ISA = qw( Exporter );

# these are exported by default.
our @EXPORT = qw( login );

sub login ($$) {
    my $login = shift;
    my $pass = shift;

    db_connect();
    print $login;
    print $pass;;
    return ("$login $pass");
}


1;
